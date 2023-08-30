import React from "react";

const FundingCard = (props) => {
  const { data } = props;
  return (
    <div className="border border-gray-200 shadow rounded mb-4 p-2">
      <p className="font-semibold text-gray-700 text-base">Tên dự án</p>
      <p className="mb-2">{data.projectName}</p>
      <p className="font-semibold text-gray-700 text-base">Người ủng hộ</p>
      <p className="mb-2">{data.contributor.name}</p>
      <p className="font-semibold text-gray-700 text-base">Nội dung:</p>
      <p className="mb-2">{data.message}</p>
      <p className="font-semibold text-gray-700 text-base">Số tiền</p>
      <p className="mb-2">{data.amount} đồng</p>
    </div>
  );
};

export default FundingCard;
