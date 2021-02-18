import { useRouter } from "next/router";
import { Card, Col, Row, Table, Tabs, Tag, Avatar, message } from "antd";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import AppLayout from "../../../../lib/component/layout";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { cid } = context.params;

  return {
    props: { id: cid },
  };
}
const studentDetails = (props) => {
  const router = useRouter();
  const { cid } = router.query;

  return (
    <>
      <AppLayout>
          {cid}
      </AppLayout>
    </>
  );
};

export default studentDetails;
