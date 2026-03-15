type IOptions = {
    page?:number | string;
    limit?:number | string;
    sortOrder?: string;
    sortBy?: string;
}

// make a return type
type IOptionsResult = {
    page:number,
    limit: number,
    skip: number,
    sortBy: string,
    sortOrder: string
}

const paginationSortingHelper = (options : IOptions): IOptionsResult =>{

    // for pagination
    const page: number = Number(options.page) ||  1;
    const limit: number = Number(options.limit) || 10;
    const skip: number = (page - 1) * limit;


    // for sorting
    const sortBy: string = options.sortBy || 'createdAt' ;
    const sortOrder: string = options.sortOrder || 'desc';

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    };
}

export default paginationSortingHelper;