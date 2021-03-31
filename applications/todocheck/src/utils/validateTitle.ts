const validateTitle = (title: string): string | undefined => {
  if (!title) {
    return "Please fill up the title.";
  }
};

export default validateTitle;
