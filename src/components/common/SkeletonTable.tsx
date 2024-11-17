import { Table, Skeleton, TableProps } from "antd";

type SkeletonTableProps = TableProps & {
  rowCount?: number;
};

const SkeletonTable: React.FC<SkeletonTableProps> = ({ columns, rowCount, ...props }) => {
  return (
    <Table
      rowKey="key"
      pagination={false}
      dataSource={[...Array(rowCount)].map((_, index) => ({
        key: `key${index}`,
      }))}
      columns={columns?.map((column) => {
        return {
          ...column,
          render: function renderPlaceholder() {
            return (
              <Skeleton
                key={column?.key ?? ""}
                title={true}
                paragraph={false}
                className="h-[23px]"
              />
            );
          },
        };
      })}
      {...props}
    />
  );
};

export default SkeletonTable;
