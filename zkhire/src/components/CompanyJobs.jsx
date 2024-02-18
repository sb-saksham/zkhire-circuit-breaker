import {
    Table, TableHeader, TableColumn,
    TableBody, TableRow, TableCell
} from "@nextui-org/react";

import { useAccount, useContractRead } from "wagmi";
import { useNavigate } from "react-router";
// import 
import { toast } from "react-toastify";
import { contractDetails } from "../utils/general";

function CompanyJobs() {
    const navigate = useNavigate();
    const { address: companyAddress } = useAccount();
    const { companyJobs,  } = 
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
                {companyJobsData.forEach((comp, i) => {
                    return (
                    <TableRow key={i}>
                        <TableCell>{comp.name}</TableCell>
                        <TableCell>{comp.title}</TableCell>
                        <TableCell>{comp.salary}</TableCell>
                        <TableCell>{comp.openings}</TableCell>
                    </TableRow>
                    );
                })}
            </TableBody>
        </Table>

    </>
);
}

export default CompanyJobs;