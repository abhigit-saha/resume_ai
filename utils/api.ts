import { revalidatePath } from "next/cache";

const createUrl = (path: String) => {
  return window.location.origin + path;
};

//functions that are going to be called in the frontend.
//note content here would have all the properties of the resume schema
//ie intro, prof exp etc.
export const updateResume = async (id: String, content) => {
  try {
    const res = await fetch(new Request(createUrl(`/api/resume/{id}`)), {
      method: "PATCH",
      body: JSON.stringify(content),
    });

    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const createNewEntry = async () => {
  const res = await fetch(new Request(createUrl("/api/resume")), {
    method: "POST",
  });

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
