export const getClassNames = (module) => {
  return (...classnames) => {
    let className = "";
    classnames.forEach((classname) => {
      if (!classname || typeof className != "string") {
        return;
      }
      if (!module[classname]) {
        className += ` ${classname}`;
        return;
      }
      className += ` ${module[classname]}`;
    });
    return className;
  };
};

export const arePathsEqual = (path1, path2) => {
  return path1 === path2;
};

export async function resolveResponse(promise) {
  try {
    const { data } = await promise;
    return data;
  } catch (err) {
    return (
      err.response?.data ?? {
        type: "ERROR",
        message: message.api.error.SOMETHING_WENT_WRONG,
        result: null,
      }
    );
  }
}

export function isErrorResponse(response) {
  return response.type == "ERROR";
}

export const isEmptyArray = (arr) => {
  return !arr || arr.length === 0;
};

export function getFormattedDateParts(rawDate) {
  const date = new Date(rawDate);

  const day = date.toLocaleString("en-US", { weekday: "long" }).slice(0, 3);
  const month = date.toLocaleString("en-US", { month: "long" }).slice(0, 3);
  const dateNumber = date.getDate();
  const year = date.getFullYear();

  return `${day}, ${month} ${dateNumber}, ${year}`;
}
