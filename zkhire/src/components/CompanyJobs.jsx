import {
    Table, TableHeader, TableColumn,
    TableBody, TableRow, TableCell
} from "@nextui-org/react";

import { useAccount, useContractRead } from "wagmi";
import { useNavigate } from "react-router";
// import 
import { contractDetails } from "../utils/general";

function CompanyJobs() {
    const navigate = useNavigate();
    const { address: companyAddress } = useAccount();
    const { data: companyJobs, error: companyJobsError } = 
        useContractRead({
            ...contractDetails,
            functionName: "",
            arguments: [companyAddress]
        });
    return (
    <>      
        <h1><strong>Company Jobs Postings</strong></h1>
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>COMPANY NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>COMPENSATION/SALARY</TableColumn>
                <TableColumn>CURRENT OPENINGS</TableColumn>
            </TableHeader>
            <TableBody>    
                {companyJobs.forEach((comp, i) => {
                    return (
                        <TableRow key={i}>
                        <TableCell>{comp.jd.name}</TableCell>
                        <TableCell>{comp.jd.title}</TableCell>
                        <TableCell>{comp.jd.salary}</TableCell>
                        <TableCell>{comp.jd.openings}</TableCell>
                        <TableCell>{ASSESSMENT_TYPES[comp.jd.assessmentType]}</TableCell>    
                        <TableCell><Button variant="success" onClick={navigate(`/jobs/${comp.jobId}/`)}>Apply</Button></TableCell>
                    </TableRow>
                    );
                })}
            </TableBody>
        </Table>

    </>
);
}

export default CompanyJobs;