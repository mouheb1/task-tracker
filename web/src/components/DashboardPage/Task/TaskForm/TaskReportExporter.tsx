// src/components/TaskReportExporter.tsx

import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'src/template/ui/button';
import { Task } from 'types/graphql';
import { useFieldArray, useFormContext } from 'react-hook-form';

// Set the fonts to use in pdfMake
if (pdfFonts.pdfMake) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
} else if (pdfFonts.default && pdfFonts.default.pdfMake) {
  pdfMake.vfs = pdfFonts.default.pdfMake.vfs;
} else if (pdfFonts.vfs) {
  pdfMake.vfs = pdfFonts.vfs;
} else if (pdfFonts.default && pdfFonts.default.vfs) {
  pdfMake.vfs = pdfFonts.default.vfs;
} else {
  console.error('Could not set pdfMake.vfs. pdfFonts:', pdfFonts);
}

interface TaskReportExporterProps {
  task: Partial<Task>;
}

const TaskReportExporter: React.FC<TaskReportExporterProps> = ({ task }) => {
  const { control } = useFormContext();

  const { fields } = useFieldArray({
    control,
    name: 'taskHistories',
  });

  const exportTaskReportToPDF = async () => {
    // Map task histories to include prices and status
    const taskHistoriesData = fields.map((item, index) => ({
      'No.': index + 1,
      Action: item.action,
      Details: item.details || '',
      'Created At': item.createdAt
        ? new Date(item.createdAt).toLocaleString()
        : '',
      Price: item.price !== undefined ? item.price.toFixed(2) : '0.00',
      Status: item.deletedAt ? 'Deleted' : 'Active',
      DeletedAt: item.deletedAt ? new Date(item.deletedAt) : null, // Include deletedAt for later use
    }));

    // Prepare data
    const userFullName = task?.user
      ? `${task.user.givenName || ''} ${task.user.familyName || ''}`.trim()
      : 'user';
    const clientFullName = task?.client
      ? `${task.client.givenName || ''} ${task.client.familyName || ''}`.trim()
      : 'client';
    const dateOfGeneration = new Date().toISOString().split('T')[0];

    const filename = `task_report_${userFullName}_${clientFullName}_${dateOfGeneration}.pdf`;

    // Fetch and convert the organization's logo to base64 if available
    let orgLogoBase64 = null;
    if (task?.user?.organization?.logo) {
      orgLogoBase64 = await getBase64ImageFromURL(task.user.organization.logo);
    }

    // Define the PDF document
    const docDefinition = {
      content: [
        // Organization Logo
        orgLogoBase64 && {
          image: orgLogoBase64,
          width: 100,
          alignment: 'left',
          margin: [0, 0, 0, 10],
        },
        // Report Title
        { text: 'Task Report', style: 'reportTitle' },
        // Task Information
        {
          style: 'section',
          table: {
            widths: ['*'],
            body: [
              [
                {
                  stack: [
                    { text: 'Task Information', style: 'sectionHeader' },
                    {
                      columns: [
                        {
                          width: '50%',
                          stack: [
                            { text: `Title:`, style: 'label' },
                            { text: task?.title || '', style: 'value' },
                          ],
                        },
                        {
                          width: '50%',
                          stack: [
                            { text: `Status:`, style: 'label' },
                            { text: task?.status || '', style: 'value' },
                          ],
                        },
                      ],
                      columnGap: 10,
                    },
                    {
                      text: `Description:`,
                      style: 'label',
                      margin: [0, 10, 0, 0],
                    },
                    { text: task?.description || '', style: 'value' },
                    {
                      columns: [
                        {
                          width: '50%',
                          stack: [
                            {
                              text: `Due Date:`,
                              style: 'label',
                              margin: [0, 10, 0, 0],
                            },
                            {
                              text: task?.dueDate
                                ? new Date(task.dueDate).toLocaleDateString()
                                : '',
                              style: 'value',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            ],
          },
          layout: 'noBorders',
        },
        // Client Information and User Information Side by Side
        {
          style: 'section',
          columns: [
            {
              width: '50%',
              stack: [
                { text: 'Client Information', style: 'sectionHeader' },
                {
                  style: 'infoTable',
                  table: {
                    widths: ['auto', '*'],
                    body: [
                      ['Name:', clientFullName],
                      ['Email:', task?.client?.email || ''],
                      ['Phone:', task?.client?.phone || ''],
                    ],
                  },
                  layout: 'noBorders',
                },
              ],
            },
            {
              width: '50%',
              stack: [
                { text: 'User Information', style: 'sectionHeader' },
                {
                  style: 'infoTable',
                  table: {
                    widths: ['auto', '*'],
                    body: [
                      ['Name:', userFullName],
                      ['Email:', task?.user?.email || ''],
                    ],
                  },
                  layout: 'noBorders',
                },
              ],
            },
          ],
          columnGap: 20,
        },
        // Task Histories
        {
          text: 'Task Histories',
          style: 'sectionHeader',
          margin: [0, 20, 0, 10],
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', '*', 'auto', 'auto'],
            body: [
              [
                { text: 'No.', style: 'tableHeader' },
                { text: 'Action', style: 'tableHeader' },
                { text: 'Details', style: 'tableHeader' },
                { text: 'Created At', style: 'tableHeader' },
                { text: 'Price', style: 'tableHeader' },
                { text: 'Status', style: 'tableHeader' },
              ],
              ...taskHistoriesData.map((th) => [
                { text: th['No.'], style: 'tableCell' },
                { text: th.Action, style: 'tableCell' },
                { text: th.Details, style: 'tableCell' },
                { text: th['Created At'], style: 'tableCell' },
                { text: th.Price, style: 'tableCell' },
                { text: th.Status, style: 'tableCell' },
              ]),
            ],
          },
          layout: {
            fillColor: function (rowIndex: number, node: any, columnIndex: number) {
              // Skip header row (rowIndex === 0)
              if (rowIndex === 0) {
                return null;
              }
              const dataIndex = rowIndex - 1; // Adjust for header row
              const taskHistory = taskHistoriesData[dataIndex];
              if (taskHistory.Status === 'Deleted') {
                return '#ffcccc'; // Light red background for deleted histories
              } else if (rowIndex % 2 === 0) {
                return '#f9f9f9'; // Alternate row color
              }
              return null;
            },
            hLineColor: '#e0e0e0',
            vLineColor: '#e0e0e0',
          },
        },
      ],
      styles: {
        reportTitle: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        section: {
          margin: [0, 10, 0, 10],
        },
        sectionHeader: {
          fontSize: 16,
          bold: true,
          color: '#4e73df',
          margin: [0, 0, 0, 10],
        },
        label: {
          fontSize: 12,
          bold: true,
          color: '#333333',
        },
        value: {
          fontSize: 12,
          color: '#333333',
        },
        tableHeader: {
          fontSize: 12,
          bold: true,
          fillColor: '#4e73df',
          color: '#ffffff',
          alignment: 'center',
          margin: [0, 5, 0, 5],
        },
        tableCell: {
          fontSize: 12,
          color: '#333333',
          margin: [0, 5, 0, 5],
        },
      },
      defaultStyle: {
        fontSize: 12,
        columnGap: 20,
      },
    };

    // Generate the PDF and download it
    pdfMake.createPdf(docDefinition).download(filename);
  };

  // Function to convert image URL to base64
  const getBase64ImageFromURL = async (url: string) => {
    const res = await fetch(url);
    const blob = await res.blob();

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          resolve(reader.result as string);
        },
        false
      );

      reader.onerror = () => {
        reject('Failed to convert logo to base64');
      };
      reader.readAsDataURL(blob);
    });
  };

  return (
    <Button type="button" onClick={exportTaskReportToPDF}>
      Export Task Report to PDF
    </Button>
  );
};

export default TaskReportExporter;
