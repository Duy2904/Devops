import "./BookingOrder.scss";

import { Flex, Input, Pagination, Spin, Table, TableProps, Tag, Typography } from "antd";
import { SorterResult } from "antd/es/table/interface";
import classNames from "classnames";
import dayjs from "dayjs";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TripHotelBookingOrderDto } from "sdk/tmc";

import { StatusBooking } from "@/components/booking/StatusBooking";
import LocaleRangePicker from "@/components/common/LocaleRangePicker";
import SkeletonTable from "@/components/common/SkeletonTable";
import { useReadBookingOrder } from "@/query-hooks/mutations/booking-order";
import { ROUTES } from "@/routers/routes";
import { toRoute } from "@/utils";
import { SearchOutlined } from "@ant-design/icons";

import { useListBooking } from "../hooks/useListBooking";

function BookingOrdersList() {
  // hooks
  const { t } = useTranslation();
  const navigate = useNavigate();

  // queries
  const {
    data,
    isLoading,
    pagination,
    currentPage,
    keyword,
    rangeDate,
    sortField,
    isAsc,
    onPageChange,
    onKeywordChange,
    onRangeDateChange,
    onSortOptionChange,
  } = useListBooking();

  // mutations
  const { mutateAsync: readBookingOrder, isLoading: isReadingBookingOrder } = useReadBookingOrder();

  const getSortOrder = (field: string): "ascend" | "descend" | null => {
    if (sortField === field) {
      return isAsc === "true" ? "ascend" : "descend";
    }
    return null;
  };

  // MARK: Column render
  const columns: TableProps["columns"] = [
    {
      title: t("Customer name"),
      dataIndex: "employeeName",
      key: "employeeName",
      sorter: true,
      sortOrder: getSortOrder("employeeName"),
      onCell: (record: TripHotelBookingOrderDto) => {
        let newClassName;

        if (!isLoading) {
          newClassName = record.isRead ? "" : "border-l-4 border-blue-500";
        }

        return {
          className: newClassName,
        };
      },
    },
    {
      title: t("Corp name"),
      dataIndex: "corpName",
      key: "corpName",
      sorter: true,
      sortOrder: getSortOrder("corpName"),
    },
    {
      title: t("Request time"),
      dataIndex: "requestedAt",
      key: "requestedAt",
      render: (requestedAt: string) => {
        return <>{dayjs(requestedAt).format("hh:mm A - DD/MM/YYYY")}</>;
      },
    },
    {
      title: t("Check-in & out"),
      dataIndex: "checkIn",
      key: "checkIn",
      render: (_: string, record: any) => {
        return (
          <>
            {`${dayjs(get(record, ["checkIn"])).format("ddd, MMM DD ")} -
              ${dayjs(get(record, ["checkOut"])).format("ddd, MMM DD, YYYY")}`}
          </>
        );
      },
    },
    {
      title: t("Destination"),
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: t("Status"),
      dataIndex: "bookingStatus",
      key: "bookingStatus",
      render: (statusBooking: number) => {
        return <StatusBooking bookingStatus={statusBooking} />;
      },
      sorter: true,
      sortOrder: getSortOrder("bookingStatus"),
    },
    {
      title: t("Trip ID"),
      dataIndex: "tripCode",
      key: "tripCode",
      render: (tripId: string) => {
        return <span className="hover:text-blue-500 cursor-pointer">{tripId}</span>;
      },
      sorter: true,
      sortOrder: getSortOrder("tripCode"),
    },
  ];

  const handleChangeSortOption = (sort: SorterResult<TripHotelBookingOrderDto>) => {
    let dataIndex = sort?.column?.key?.toString() ?? "";
    onSortOptionChange({
      fieldName: dataIndex,
      isAsc: sort.order === "ascend" ? true : false,
    });
  };

  const handleRowClick = async (record: TripHotelBookingOrderDto) => {
    try {
      if (!record?.isRead) {
        readBookingOrder({ tripIds: [record?.id ?? ""], isRead: true });
      }
      navigate(toRoute(ROUTES.BOOKING_ORDER_DETAIL, { bookingOrderId: record?.id }));
    } catch (error) {
      toast.error(t("Failed to get booking order detail"));
    }
  };

  // MARK: Component render
  return (
    <Flex
      vertical
      className="w-full">
      <Spin
        spinning={isReadingBookingOrder}
        fullscreen
      />
      <Typography.Title level={1}>{t("Booking orders")}</Typography.Title>
      <Flex
        justify={"space-between"}
        align="center"
        className="py-2">
        <Flex flex={2}>
          <LocaleRangePicker
            defaultValue={[dayjs().subtract(30, "days"), dayjs()]}
            format={"DD-MM-YYYY"}
            placeholder={[t("From"), t("Till now")]}
            allowEmpty={[false, true]}
            value={rangeDate}
            onChange={(date) => {
              onRangeDateChange(date);
            }}
          />
        </Flex>
        <Flex flex={1}>
          <Input
            className="focus:border-primary bg-greyCustom01 border-none w-full min-h-[36px]"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder={t("Search your orders, customer name")}
            prefix={
              <SearchOutlined
                style={{
                  color: "#1677FF",
                  fontSize: 20,
                }}
              />
            }
          />
        </Flex>
      </Flex>
      <Flex vertical>
        <div className="min-h-[10rem]">
          {isLoading && (
            <SkeletonTable
              className="w-full"
              columns={columns}
              pagination={false}
              rowCount={10}
            />
          )}
          <Table
            className={classNames("w-full", { hidden: isLoading })}
            
            columns={columns}
            dataSource={data}
            pagination={false}
            onChange={(_, __, sort) => {
              handleChangeSortOption(sort as SorterResult<TripHotelBookingOrderDto>);
            }}
            onRow={(record) => {
              return {
                onClick: () => handleRowClick(record),
              };
            }}
            rowClassName={(record) => {
              return `cursor-pointer ${record.isRead ? "" : "font-bold"}`;
            }}
          />
        </div>

        {(pagination?.totalPages ?? 0) > 0 && (
          <Flex
            justify={"flex-end"}
            className="mt-3">
            <Pagination
              defaultCurrent={1}
              current={currentPage}
              total={pagination.totalCount}
              onChange={(newPage) => onPageChange(newPage)}
            />
            <Tag className="flex items-center justify-center bg-greyCustom01 me-0 ml-2">
              {t("Page")} {currentPage}/{pagination.totalPages}
            </Tag>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default BookingOrdersList;
