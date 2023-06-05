import useFetchBmi from "../hooks/useFetchBmi";
import useFetchBmr from "../hooks/useFetchBmr";

const useFetchBmiAndBmr = (weight, height, age, gender) => {
  const { bmi, classification, fetchBmi } = useFetchBmi(weight, height);
  const { bmr, fetchBmr } = useFetchBmr(weight, height, age, gender);

  const fetchData = async () => {
    await fetchBmi();
    await fetchBmr();
  };

  console.log("bmi", bmi);
    console.log("bmr", bmr);
    console.log("classification", classification);

  return { bmi, classification, bmr, fetchData };
};

export default useFetchBmiAndBmr;