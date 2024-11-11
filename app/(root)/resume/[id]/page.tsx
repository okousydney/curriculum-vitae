import { use } from "react";

const ResumePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const data = use(params);
  return <div>Resume num {data?.id}</div>;
};

export default ResumePage;
