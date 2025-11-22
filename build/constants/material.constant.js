"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMindMapUserMessage = exports.createFlashcardUserMessage = exports.createQuizUserMessage = void 0;
const createQuizUserMessage = (noteContent, userInstruction) => {
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
exports.createQuizUserMessage = createQuizUserMessage;
const createFlashcardUserMessage = (noteContent, userInstruction) => {
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
exports.createFlashcardUserMessage = createFlashcardUserMessage;
const createMindMapUserMessage = (noteContent, userInstruction) => {
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
exports.createMindMapUserMessage = createMindMapUserMessage;
const createStudyMaterialUserMessage = (materialType, noteContent, userInstruction) => {
    switch (materialType) {
        case "quiz":
            return (0, exports.createQuizUserMessage)(noteContent, userInstruction);
        case "flash-card":
            return (0, exports.createFlashcardUserMessage)(noteContent, userInstruction);
        case "mind-map":
            return (0, exports.createMindMapUserMessage)(noteContent, userInstruction);
        default:
            throw new Error("Invalid material type");
    }
};
exports.default = { createStudyMaterialUserMessage };
