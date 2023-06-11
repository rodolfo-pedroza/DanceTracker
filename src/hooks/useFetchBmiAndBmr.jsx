import useFetchBmi from "../hooks/useFetchBmi";
import useFetchBmr from "../hooks/useFetchBmr";

const useFetchBmiAndBmr = (weight, height, age, gender, callback) => {
  const { bmi, classification, fetchBmi } = useFetchBmi(weight, height);
  const { bmr, fetchBmr } = useFetchBmr(weight, height, age, gender);

  const fetchData = async () => {
    await fetchBmi();
    await fetchBmr();
    if (bmi && bmr && classification) {
      callback(bmi, bmr, classification);
    }
  };

  console.log("bmi hook", bmi);
    console.log("bmr hook", bmr);
    console.log("classification hook", classification);

  return { bmi, classification, bmr, fetchData };
};

export default useFetchBmiAndBmr;