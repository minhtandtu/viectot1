import React from "react";
import FundingCard from "./FundingCard";

const FundingInfo = (props) => {
  const { fundingInfor } = props;
  return (
    <div className="pt-16 px-4 ">
      <p className="text-center text-2xl font-bold pb-4">Danh sách đóng góp</p>
      {fundingInfor.map((item, index) => {
        return <FundingCard data={item} key={index}></FundingCard>;
      })}
    </div>
  );
};

export default FundingInfo;
