interface TableSkeletonProps {
  colSpan: number;
}

const TableSkeleton = ({ colSpan }: TableSkeletonProps) => {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center p-4">
        <div className="flex animate-pulse">
          <div className="w-full">
            <ul className="space-y-3">
              <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
            </ul>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TableSkeleton;
