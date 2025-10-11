export const appendFileToForm = (formData, key, fileList) => {
  if (fileList.length > 0) {
    const file = fileList[0];
    if (file.originFileObj) {
      formData.append(key, file.originFileObj);
    } else if (file.url) {
      formData.append(key, file.url);
    }
  }
};