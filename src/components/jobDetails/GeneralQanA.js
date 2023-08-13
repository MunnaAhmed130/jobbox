import React, { useEffect, useState } from "react";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import {
  useQuestionMutation,
  useReplyMutation,
} from "../../features/job/jobApi";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

const GeneralQanA = ({ user, data }) => {
  const { queries, _id } = data?.data || {};

  const { register, handleSubmit, reset } = useForm();
  const [reply, setReply] = useState("");

  const [sendQuestion, { isSuccess, isLoading, isError, error }] =
    useQuestionMutation();

  const [sendReply, sendReplyStatus] = useReplyMutation();

  useEffect(() => {
    sendReplyStatus.isLoading &&
      toast.loading("Posting Reply ...", { id: "sendReply" });

    if (sendReplyStatus.isSuccess) {
      toast.success("Reply post successful", { id: "sendReply" });
    }

    sendReplyStatus.isError &&
      toast.error(sendReplyStatus.error, { id: "sendReply" });

    isLoading && toast.loading("Submitting Question", { id: "sendQuestion" });

    isSuccess && toast.success("Question submitted", { id: "sendQuestion" });

    isError && toast.error(error, { id: "sendQuestion" });
  }, [sendReplyStatus, isSuccess, isLoading, isError, error]);

  const handleQuestion = (data) => {
    const questionData = {
      ...data,
      userId: user._id,
      email: user.email,
      jobId: _id,
    };
    // console.log(questionData);
    sendQuestion(questionData);
    reset();
  };

  const handleReplay = (id) => {
    const data = { reply, userId: id };
    console.log(data);
    sendReply(data);
  };

  return (
    <div>
      <div>
        <h1 className="text-xl font-semibold text-primary mb-5">General Q&A</h1>
        <div className="text-primary my-2">
          {queries?.map(({ question, email, reply, _id }) => (
            <div key={question}>
              <small>{email}</small>
              <p className="text-lg font-medium">{question}</p>
              {reply?.map((item) => (
                <p
                  key={item}
                  className="flex items-center gap-2 relative left-5"
                >
                  <BsArrowReturnRight /> {item}
                </p>
              ))}
              {user.role === "employer" && (
                <div className="flex gap-3 my-5">
                  <input
                    placeholder="Reply"
                    type="text"
                    className="w-full"
                    onBlur={(e) => setReply(e.target.value)}
                  />
                  <button
                    className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                    type="button"
                    onClick={() => handleReplay(_id)}
                  >
                    <BsArrowRightShort size={30} />
                  </button>
                </div>
              )}
            </div>
          ))}

          {!queries?.length && (
            <div className="bg-primary/10 py-7 text-center rounded">
              <p>No Questions Posted ...</p>
            </div>
          )}
        </div>

        {user.role === "candidate" && (
          <form onSubmit={handleSubmit(handleQuestion)}>
            <div className="flex gap-3 my-5">
              <input
                placeholder="Ask a question..."
                type="text"
                className="w-full"
                {...register("question")}
              />
              <button
                className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                type="submit"
              >
                <BsArrowRightShort size={30} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default GeneralQanA;
