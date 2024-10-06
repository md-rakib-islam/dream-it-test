const formatDate = (data) => {
  const date = new Date(data);
  const now = new Date();

  const options = {
    day: "numeric",
    month: "long",
  };

  // Check if the year is the current year
  if (date.getFullYear() !== now.getFullYear()) {
    options.year = "numeric";
  }

  return date.toLocaleDateString("en-GB", options);
};

export default formatDate;
