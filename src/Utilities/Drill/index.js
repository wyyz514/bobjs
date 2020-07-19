export default function drill(path, source) {
  const steps = path.split(".");

  function _drill(index, cnt) {
    const mightBeNumber = parseInt(steps[index]);
    const isNumber = !isNaN(mightBeNumber);
    const currentStep = isNumber ? mightBeNumber : steps[index];
    if (index === steps.length - 1) {
      return cnt(currentStep);
    }
    return _drill(index + 1, function(nextStep) {
      return cnt(currentStep)[nextStep];
    });
  }

  if (!source) {
    return "";
  }
  return _drill(0, function(step) {
    if (!source) {
      return "";
    }
    return source[step];
  });
}
