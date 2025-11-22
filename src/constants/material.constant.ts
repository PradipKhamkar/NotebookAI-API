import { IMaterialUserInstruction, MaterialType } from "../types/material.type";

export const createQuizUserMessage = (noteContent:string, userInstruction:IMaterialUserInstruction) => {
  return `Generate QUIZ study material from the provided notes.

**Material Type**: quiz
**Quantity**: ${userInstruction.numberOfContain}
**Difficulty**: ${userInstruction.difficultyLevel}
${userInstruction.instruction ? `**Custom Instructions**: ${userInstruction.instruction}\n` : ''}
---

**NOTES TO GENERATE QUIZ FROM**:

${noteContent}

---

Create a comprehensive quiz that tests understanding of the key concepts. Ensure questions are clear, options are plausible, and explanations are educational.`;
};

export const createFlashcardUserMessage = (noteContent:string, userInstruction:IMaterialUserInstruction) => {
  return `Generate FLASHCARD study material from the provided notes.

**Material Type**: flashcard
**Quantity**: ${userInstruction.numberOfContain}
**Difficulty**: ${userInstruction.difficultyLevel}
${userInstruction.instruction ? `**Custom Instructions**: ${userInstruction.instruction}\n` : ''}
---

**NOTES TO GENERATE FLASHCARDS FROM**:

${noteContent}

---

Create flashcards that promote active recall and help memorize key concepts. Include clear questions and comprehensive answers with explanations where helpful.`;
};

export const createMindMapUserMessage = (noteContent:string, userInstruction:IMaterialUserInstruction) => {
  return `Generate MINDMAP study material from the provided notes.

**Material Type**: mindmap
**Quantity**: ${userInstruction.numberOfContain}
**Difficulty**: ${userInstruction.difficultyLevel}
${userInstruction.instruction ? `**Custom Instructions**: ${userInstruction.instruction}\n` : ''}
---

**NOTES TO GENERATE MINDMAP FROM**:

${noteContent}

---

Create a hierarchical mind map that visualizes the relationships between concepts. Organize information logically from general to specific.`;
};

const createStudyMaterialUserMessage = ( materialType:MaterialType,
  noteContent: string,
  userInstruction: IMaterialUserInstruction)=>{
    switch(materialType){
      case "quiz":
        return createQuizUserMessage(noteContent, userInstruction);
      case "flash-card":
        return createFlashcardUserMessage(noteContent, userInstruction);
      case "mind-map":
        return createMindMapUserMessage(noteContent, userInstruction);
      default:
        throw new Error("Invalid material type");
    }
}

export default { createStudyMaterialUserMessage };