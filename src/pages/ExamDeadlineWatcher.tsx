import { useEffect, useRef, useState } from "react";
import { useApp } from "../store";
import { finishExam } from "../domain/exams";

// Deadline follows the saved exam even while another learning page is open.
export function ExamDeadlineWatcher() {
  const { state, commit, status } = useApp();
  const commitRef = useRef(commit);
  commitRef.current = commit;
  const attempted = useRef("");
  const storageFailed = useRef(false);
  const [recovery, setRecovery] = useState(0);
  useEffect(() => {
    if (status === "error") storageFailed.current = true;
    if (status === "saved" && storageFailed.current) {
      storageFailed.current = false;
      attempted.current = "";
      setRecovery((value) => value + 1);
    }
  }, [status]);
  const id = state.examDraft?.id,
    deadline = state.examDraft?.deadline;
  useEffect(() => {
    if (!id || deadline === undefined) {
      attempted.current = "";
      return;
    }
    const check = () => {
      const now = Date.now();
      if (now < deadline || attempted.current === id) return;
      attempted.current = id;
      void commitRef
        .current((s) => (s.examDraft?.id === id ? finishExam(s, id, now) : s))
        .catch(() => {});
    };
    check();
    const timer = setInterval(check, 500);
    window.addEventListener("focus", check);
    document.addEventListener("visibilitychange", check);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", check);
      document.removeEventListener("visibilitychange", check);
    };
  }, [id, deadline, recovery]);
  return null;
}
