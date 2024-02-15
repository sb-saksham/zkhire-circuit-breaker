import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
  return (  
    <div className='mt-4 p-1'>
      <h3>Welcome to ZkHire</h3>  
      <h3>A Zero-Knowledge Hiring platform that allows recruiters to find employees based purely on skill and no referral and allow People to get jobs based solely on their skills without any discrimination.</h3>
      <hr/>
      <h3>For Users</h3>
      <h4>Get jobs based solely on their skills</h4>
      <h3>For Companies</h3>
      <h4>Find employees based purely on skill or for a particuclar role!</h4>
      <br />
      <h3><strong>Working (User WorkfLow)</strong></h3>
    
      <br />
      <h3><strong>Working (Company WorkfLow)</strong></h3>
    
    </div>
  );
}

export default HomePage;