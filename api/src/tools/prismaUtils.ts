// -- ./src/tools/prismaUtils.ts
// Utility to clean objects by removing undefined or null values
const cleanObject = (obj: any) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {} as any);
};

// Helper function to check if a value is not null, undefined, or empty string
function isNotNullOrUndefinedOrEmpty(value: any): boolean {
  return value !== undefined && value !== null && value !== '';
}

// Function to handle individual filter items
function prismaFilterItem(field: string, filterAttrVal: any): any {
  if (field === 'deletedAt') {
    return { [field]: filterAttrVal }
  }

  if (filterAttrVal === undefined || filterAttrVal === null) {
    return undefined;
  }

  // Handle scalar values and arrays directly
  if (typeof filterAttrVal !== 'object' || Array.isArray(filterAttrVal)) {
    if (Array.isArray(filterAttrVal)) {
      return { [field]: { in: filterAttrVal } };
    } else {
      return { [field]: filterAttrVal };
    }
  }

  // Clean the filter object
  filterAttrVal = cleanObject(filterAttrVal);

  if (Object.keys(filterAttrVal).length === 0) {
    return undefined;
  }

  // Handle different operators using the helper function
  if (isNotNullOrUndefinedOrEmpty(filterAttrVal.eq)) {
    return { [field]: filterAttrVal.eq };
  } else if (isNotNullOrUndefinedOrEmpty(filterAttrVal.notEq)) {
    return { [field]: { not: filterAttrVal.notEq } };
  } else if (isNotNullOrUndefinedOrEmpty(filterAttrVal.in)) {
    return { [field]: { in: filterAttrVal.in } };
  } else if (isNotNullOrUndefinedOrEmpty(filterAttrVal.notIn)) {
    return { [field]: { notIn: filterAttrVal.notIn } };
  } else if (filterAttrVal.between && (isNotNullOrUndefinedOrEmpty(filterAttrVal.between.min) || isNotNullOrUndefinedOrEmpty(filterAttrVal.between.max))) {
    const { min, max } = filterAttrVal.between;
    const conditions: any = {};
    if (isNotNullOrUndefinedOrEmpty(min)) {
      conditions.gte = min;
    }
    if (isNotNullOrUndefinedOrEmpty(max)) {
      conditions.lte = max;
    }
    return { [field]: conditions };
  } else if (isNotNullOrUndefinedOrEmpty(filterAttrVal.contains)) {
    return {
      [field]: {
        contains: filterAttrVal.contains,
        mode: 'insensitive',
      },
    };
  } else if (filterAttrVal.isNull !== undefined) {
    if (filterAttrVal.isNull) {
      return { [field]: null };
    } else {
      return { NOT: { [field]: null } };
    }
  } else {
    console.warn(`Unknown filter ${JSON.stringify(filterAttrVal)} on field ${field}`);
    return undefined;
  }
}

// Function to build the filter from multiple filter items
function prismaBuildFilter(filters: any): any {
  if (typeof filters !== 'object') {
    return undefined;
  }

  const whereClauses: any[] = [];

  for (const [attrName, filterAttrVal] of Object.entries(filters)) {
    if (filterAttrVal === undefined) {
      continue;
    }

    const condition = prismaFilterItem(attrName, filterAttrVal);

    if (condition) {
      whereClauses.push(condition);
    }
  }

  if (whereClauses.length === 0) {
    return undefined;
  }

  // Combine all conditions with AND
  return whereClauses.length === 1 ? whereClauses[0] : { AND: whereClauses };
}

// Function for full-text search across multiple fields
function prismaFullTextSearchFilter(fullTextSearch: string, fields: string[]): any {
  if (isNotNullOrUndefinedOrEmpty(fullTextSearch)) {
    const search = fullTextSearch.trim();
    if (search !== '') {
      const orClauses = fields.map((field) => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      }));
      return { OR: orClauses };
    }
  }
  return undefined;
}

// Function to build the complete where clause
function prismaBuildWhereClause(filters: any, fullTextSearchFields: string[] = []): any {
  const whereClauses: any[] = [];

  // Handle full-text search
  const fullTextClause = prismaFullTextSearchFilter(filters.fullTextSearch, fullTextSearchFields);
  if (fullTextClause) {
    whereClauses.push(fullTextClause);
  }
  delete filters.fullTextSearch; // Remove to avoid duplication

  // Handle other filters
  const filterClause = prismaBuildFilter(filters);
  if (filterClause) {
    whereClauses.push(filterClause);
  }

  if (whereClauses.length === 0) {
    return undefined;
  }

  // Combine all conditions with AND
  return whereClauses.length === 1 ? whereClauses[0] : { AND: whereClauses };
}

export {
  prismaBuildWhereClause,
  prismaFullTextSearchFilter,
  prismaBuildFilter,
  prismaFilterItem,
};
