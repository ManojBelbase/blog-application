import { useState, useMemo } from 'react';
import { Button } from './UI/Button';
import type { TableProps } from '../types';


export const DataTable = <T,>({
    columns,
    data,
    keyField,
    pageSize = 10,
    loading = false,
    error = null,
    emptyMessage = "No data available."
}: TableProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / pageSize);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return data.slice(start, start + pageSize);
    }, [data, currentPage, pageSize]);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (error) {
        return (
            <div className="p-8 text-center border border-red-200 bg-red-50 text-red-600 font-bold uppercase tracking-tight text-sm">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="w-full overflow-x-auto border border-(--border-color)">
                <table className="w-full text-sm text-left">
                    <thead className="bg-(--bg-secondary) border-b border-(--border-color)">
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} scope="col" className={`px-6 py-4 font-semibold text-(--text-primary) ${column.className || ''}`}>
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-(--border-color)">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-4">
                                    <div className="space-y-4">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="h-10 bg-(--border-color)/20 border border-(--border-color) animate-pulse w-full"></div>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ) : paginatedData.length > 0 ? (
                            paginatedData.map((item) => (
                                <tr key={String(item[keyField])} className="border-b border-(--border-color)">
                                    {columns.map((column, index) => (
                                        <td key={index} className={`px-6 py-4 whitespace-nowrap text-(--text-primary) ${column.className || ''}`}>
                                            {column.render ? column.render(item) : (item[column.key as keyof T] as React.ReactNode)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500 uppercase font-bold tracking-widest text-xs">
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && !loading && (
                <div className="flex items-center justify-center gap-2 pt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>

                    <div className="flex gap-1">
                        {[...Array(totalPages)].map((_, i) => (
                            <Button
                                key={i + 1}
                                variant={currentPage === i + 1 ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => onPageChange(i + 1)}
                                className="w-8 h-8 p-0"
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};
