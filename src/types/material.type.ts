type MaterialType = "mind-map" | "quiz" | "flash-card";

interface IQuiz {
   title: string;
   quiz: {
      question: string;
      options: { serial: string, label: string }[],
      answer: string;
      explanationOfAnswer: string
   }[]
}

interface IMaterial {
   _id: string;
   noteId:any,
   type: MaterialType,
   data: IQuiz;
   createdAt: string;
   updatedAt: string;
   createdBy: string;
}

export { IMaterial, MaterialType }