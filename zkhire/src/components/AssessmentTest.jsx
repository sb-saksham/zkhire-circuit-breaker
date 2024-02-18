import {
    Button, Input
  } from "@nextui-org/react"; 
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import { toast } from "react-toastify";
  
const contractDetails = {
    address: "0xajdis",
    abi: {}
};

function AssessmentTest() {
    const { address: companyAddress } = useAccount();
    const { config: jobPostingConfig,
        error: postJobPrepError } = usePrepareContractWrite({
            ...contractDetails,
            functionName: "postJob"
        });
    const { write: postJobWrite, 
        isSuccess: postJobIsSuccess, isError: postJobIsError, } = useContractWrite(jobPostingConfig);
return (
    <>      
        <form onSubmit={(data) => {
            console.log(data);
        }}>
        <Input type="text" variant="underlined" label="Job Title" />
        <Input type="text" variant="underlined" label="Salary/Compensation" />    
        <Input type="number" variant="underlined" label="Openings Available" />
        <RadioGroup label="Select Assessment Type" style={{textAlign: "left"}}>
            <Radio value="coding" description="A coding test with 1 problem, whose code candidate have to write">
                Coding
            </Radio>
            <Radio value="quiz" description="Technical Question and Answer in Quiz/Assessment Style">
                Assessment/Quiz
            </Radio>
            <Radio value="both" description="Candidate need to appear for both Coding and Assessment">
                Both
            </Radio>
            </RadioGroup>
            <br/>
            <hr/>
            {postJobPrepError && (<h4>An Error occurred! {postJobPrepError}</h4>)}    
        <Button color="primary" variant="shadow" disabled={postJobWrite} type="submit"></Button>
    </form>
    </>
);
}

export default AssessmentTest;