import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postJob: builder.mutation({
      query: (data) => ({
        url: "/job",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),
    apply: builder.mutation({
      query: (data) => ({
        url: "/apply",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["job"],
    }),
    status: builder.mutation({
      query: (id) => ({
        url: "/status",
        method: "PATCH",
        body: id,
      }),
      invalidatesTags: ["job"],
    }),
    question: builder.mutation({
      query: (data) => ({
        url: "/query",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["job"],
    }),
    reply: builder.mutation({
      query: (data) => ({
        url: "/reply",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["job"],
    }),
    getJobs: builder.query({
      query: () => ({
        url: "/job",
      }),
      providesTags: ["jobs"],
    }),
    getAppliedJobs: builder.query({
      query: (email) => ({
        url: `/applied-jobs/${email}`,
      }),
    }),
    getJobById: builder.query({
      query: (id) => ({
        url: `/job/${id}`,
      }),
      providesTags: ["job"],
    }),
  }),
});

export const {
  usePostJobMutation,
  useGetJobsQuery,
  useGetJobByIdQuery,
  useApplyMutation,
  useGetAppliedJobsQuery,
  useQuestionMutation,
  useReplyMutation,
  useStatusMutation,
} = jobApi;
