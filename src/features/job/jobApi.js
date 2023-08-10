import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postJob: builder.mutation({
      query: (data) => ({
        url: "/url",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostJobMutation } = jobApi;
