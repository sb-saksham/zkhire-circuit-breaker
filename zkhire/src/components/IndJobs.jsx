import React, { useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";


const IndJobs = ({}) => {
  const {id: jobId} = useParams();
  const { coding, setCoding } = useAssessmentContext();
  const { data: jobDetails, error: jdFetchError } = useContractRead({
    ...contractDetails,
    functionName: "jobs",
    arguments: [jobId]
  })

  return (
    <>
        <h1>Job with Id: {jobId}</h1>      
        <div className="h-4 w-full">
        <Table aria-label="Job Description">
            <TableHeader>
                <TableColumn>COMPANY NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>COMPENSATION/SALARY</TableColumn>
                <TableColumn>CURRENT OPENINGS</TableColumn>
                <TableColumn>ASSESSMENT TYPE</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>{ jobDetails.company}</TableCell>
                    <TableCell>{ jobDetails.title }</TableCell>
                    <TableCell>{ jobDetails.compensation}</TableCell>
                    <TableCell>{ jobDetails.openings}</TableCell>
                    <TableCell>{ jobDetails.compensation}</TableCell>
                </TableRow>
            </TableBody>
        </Table>

        </div>
        <Divider />
    </>
  );
};
export default IndJobs;
