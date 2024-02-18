const useAssessmentDet = () => {
    const [assessmentMarks, setAssessmentMarks] = useLocalStorage("assessmentMarks", null);
    const [coding, setCoding] = useLocalStorage("coding", null);
    const saveAssessmentMarks = (assMarks) => {
        setAssessmentMarks(assMarks);
    };
    const saveCoding = (codingMarks) => {
        setCoding(codingMarks);
    };
    return { assessmentMarks, saveAssessmentMarks, coding, saveCoding };
};
  