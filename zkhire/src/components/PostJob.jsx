import {
    Button, Input, RadioGroup, Radio, Divider
  } from "@nextui-org/react"; 
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router";
// import 
import { toast } from "react-toastify";
import { sha256 } from "viem";
import { contractDetails } from "../utils/general";

function PostJob() {
    const navigate = useNavigate();
    // Vars
    const [title, setTitle] = useState("");
    const debouncedTitle = useDebounce(title, 500);
    const [salary, setSalary] = useState("");
    const debouncedSalary = useDebounce(salary, 500);
    const [openings, setOpenings] = useState(0);
    const debouncedOpenings = useDebounce(openings, 500);
    const jobId = sha256(debouncedOpenings.toString() + debouncedSalary + debouncedTitle).slice(0, 8);
    const { config: jobPostingConfig, error: postJobPrepError } =
        usePrepareContractWrite({
            ...contractDetails,
            functionName: "postJob",
            arguments: [debouncedTitle, debouncedSalary, BigInt(debouncedOpenings), jobId]
        });
    const { writeAsync: postJobWrite, 
        isSuccess: postJobIsSuccess, isError: postJobIsError, } = useContractWrite(jobPostingConfig);
    return (
    <>      
        <h1><strong>Post a new Job</strong></h1>
        <form className="mx-auto" style={{ maxWidth: "30%" }} onSubmit={(e) => {
            e.preventDefault();
            
        }}>
        <Input type="text" onChange={(e)=>{setTitle(e.target.value)}} variant="underlined" label="Job Title" />
        <Input type="text" onChange={(e)=>{setSalary(e.target.value)}} name="salary" variant="underlined" label="Salary/Compensation" />    
        <Input type="number" onChange={(e)=>{setOpenings(e.target.value)}} name="openings" variant="underlined" label="Openings Available" />
        <Divider/>
        <RadioGroup label="Select Assessment Type" onChange={(e)=>{setAssType(e.target.value)}}>
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
        <Divider/>
        {postJobPrepError && (<h4 className="text-red-600">An Error occurred! {postJobPrepError.message}</h4>)}    
        <Button color="primary" variant="shadow" disabled={postJobWrite} onClick={async () => {
            await postJobWrite?.();
            toast.info("Transaction Sent!");
            if (postJobIsSuccess) {
                toast.success("Job Added!");
                navigate("/company/jobs/")
            }
            
        }}>Add Company Job</Button>
    </form>
    </>
);
}

export default PostJob;