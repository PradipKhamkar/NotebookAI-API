// // const youtube = {
// //   "type": "object",
// //   "description": "Structured output schema for AI-generated YouTube video notes",
// //   "required": ["noteTitle", "note", "transcriptOfVideo", "metaData", "language"],
// //   "properties": {
// //     "noteTitle": {
// //       "type": "string",
// //       "description": "Concise title for the notes with one relevant emoji at the start",
// //       "pattern": "^[\\p{Emoji}].*",
// //       "examples": ["📚 Machine Learning Fundamentals", "🚀 Startup Growth Strategies", "🎯 Productivity Hacks for Developers"]
// //     },
// //     "note": {
// //       "type": "string",
// //       "description": "Complete structured notes in Markdown format following the specified template",
// //       "minLength": 500
// //     },
// //     "transcriptOfVideo": {
// //       "type": "string",
// //       "description": "Well-structured transcript in Markdown format with proper formatting, timestamps, and speaker identification"
// //     },
// //     "metaData": {
// //       "type": "object",
// //       "description": "Essential metadata about the video and note generation",
// //       "required": ["duration", "dateGenerated", "videoType"],
// //       "properties": {
// //         "duration": {
// //           "type": "string",
// //           "description": "Duration of the video in format like '15:30' or '1:23:45'",
// //           "pattern": "^([0-9]+:)?[0-5]?[0-9]:[0-5][0-9]$",
// //           "examples": ["5:30", "23:45", "1:15:30"]
// //         },
// //         "dateGenerated": {
// //           "type": "string",
// //           "description": "Date when notes were generated in ISO format",
// //           "format": "date",
// //           "examples": ["2025-08-31"]
// //         },
// //         "videoType": {
// //           "type": "string",
// //           "description": "Category/type of the video content",
// //           "enum": [
// //             "Educational",
// //             "Tutorial",
// //             "Lecture",
// //             "Interview",
// //             "Documentary",
// //             "Webinar",
// //             "Conference Talk",
// //             "Product Demo",
// //             "Review",
// //             "News/Analysis",
// //             "Podcast",
// //             "Workshop",
// //             "Other"
// //           ]
// //         }
// //       },
// //       "additionalProperties": false
// //     },
// //     "language": {
// //       "type": "string",
// //       "description": "Detected language of the video content (ISO 639-1 code)",
// //       "examples": ["en", "es", "fr", "de", "hi", "ja", "ko", "zh", "ar", "pt", "ru", "it"]
// //     }
// //   },
// //   "additionalProperties": false
// // }
// const pdf = {
//   "type": "object",
//   "description": "Structured output schema for AI-generated PDF document notes",
//   "required": ["noteTitle", "note", "documentText", "metaData", "language"],
//   "properties": {
//     "noteTitle": {
//       "type": "string",
//       "description": "Concise title for the notes with one relevant emoji at the start"
//     },
//     "note": {
//       "type": "string",
//       "description": "Complete structured notes in Markdown format following the specified template",
//       "minLength": 800
//     },
//     "documentText": {
//       "type": "string",
//       "description": "Complete raw text content extracted from the PDF document, preserving original formatting and structure",
//       "minLength": 100
//     },
//     // "documentSummary": {
//     //   "type": "string",
//     //   "description": "Brief 2-3 sentence overview of what the document covers",
//     //   "maxLength": 300
//     // },
//     "metaData": {
//       "type": "object",
//       "description": "Essential metadata about the document and note generation",
//       "required": ["pageCount", "documentType", "estimatedReadingTime"],
//       "properties": {
//         "pageCount": {
//           "type": "integer",
//           "description": "Total number of pages in the document",
//           "minimum": 1
//         },
//         "documentType": {
//           "type": "string",
//           "description": "Category/type of the document content",
//           "enum": [
//             "Research Paper",
//             "Technical Manual",
//             "Business Report",
//             "Academic Textbook",
//             "Legal Document",
//             "Case Study",
//             "White Paper",
//             "User Guide",
//             "Policy Document",
//             "Financial Report",
//             "Medical Document",
//             "Educational Material",
//             "Government Document",
//             "Technical Specification",
//             "Standard Operating Procedure",
//             "Contract/Agreement",
//             "Proposal",
//             "Other"
//           ]
//         },
//         "estimatedReadingTime": {
//           "type": "integer",
//           "description": "Estimated reading time for the original document in minutes",
//           "minimum": 1
//         },
//         "documentSource": {
//           "type": "string",
//           "description": "Source of the document if available"
//         }
//       }
//     },
//     "language": {
//       "type": "string",
//       "description": "Detected language of the document content (ISO 639-1 code)"
//     }
//   },
//   "additionalProperties": false
// }
// const audio = {
//   type: "object",
//   properties: {
//     noteTitle: {
//       type: "string",
//       description: "Concise title for the notes with one relevant emoji at the start"
//     },
//     note: {
//       type: "string",
//       description: "Complete structured notes in Markdown format following the specified template"
//     },
//     audioTranscript: {
//       type: "string",
//       description: "Complete transcript of the audio content with speaker attributions and timestamps if available"
//     },
//     audioSummary: {
//       type: "string",
//       description: "Brief 2-3 sentence overview of what the audio content covers"
//     },
//     metaData: {
//       type: "object",
//       properties: {
//         duration: {
//           type: "string",
//           description: "Duration of the audio in format like '15:30' or '1:23:45'"
//         },
//         audioType: {
//           type: "string",
//           description: "Category/type of the audio content",
//           enum: [
//             "Podcast",
//             "Interview",
//             "Lecture",
//             "Educational Content",
//             "Meeting/Conference Call",
//             "Presentation",
//             "Webinar",
//             "Workshop",
//             "Panel Discussion",
//             "Audiobook",
//             "Music/Song",
//             "Radio Show",
//             "Documentary",
//             "News/Broadcast",
//             "Voice Memo",
//             "Training Material",
//             "Storytelling",
//             "Other"
//           ]
//         },
//         speakerCount: {
//           type: "integer",
//           description: "Number of distinct speakers in the audio"
//         },
//         audioSource: {
//           type: "string",
//           description: "Source of the audio if available (podcast name, channel, platform, etc.)"
//         }
//       },
//       required: ["duration", "audioType", "speakerCount"]
//     },
//     language: {
//       type: "string",
//       description: "Detected language of the audio content (ISO 639-1 code)"
//     }
//   },
//   required: ["noteTitle", "note", "audioTranscript", "audioSummary", "metaData", "language"]
// };

// const video = {
//   "type": "object",
//   "properties": {
//     "title": {
//       "type": "string",
//       "description": "Generate a clear, descriptive title (3-8 words) that captures the main topic",
//       "maxLength": 100
//     },
//     "summary": {
//       "type": "string",
//       "description": "Write a concise 2-3 sentence summary of the main content and key takeaways",
//       "maxLength": 300
//     },
//     "key_points": {
//       "type": "array",
//       "description": "Extract 3-7 most important points as bullet points. Each should be actionable or memorable.",
//       "items": {
//         "type": "string",
//         "maxLength": 150
//       },
//       "minItems": 3,
//     },
//     "sections": {
//       "type": "array",
//       "description": "Organize content into 2-5 logical sections with clear headings and detailed content",
//       "items": {
//         "type": "object",
//         "properties": {
//           "heading": {
//             "type": "string",
//             "description": "Clear section heading (2-5 words)",
//             "maxLength": 50
//           },
//           "content": {
//             "type": "string",
//             "description": "Detailed section content with explanations, examples, or elaboration",
//             "maxLength": 500
//           }
//         },
//         "required": ["heading", "content"],
//         "additionalProperties": false
//       },
//       "minItems": 2,
//       "maxItems": 5
//     },
//     "language": {
//       "type": "string",
//       "description": "language of note"
//     }
//   },
//   "required": ["title", "summary", "key_points", "sections",'language'],
//   "additionalProperties": false
// };

// const youtube = {
//   "type": "object",
//   "properties": {
//     "title": {
//       "type": "string",
//       "description": "Generate a clear, descriptive title (3-8 words) that captures the main topic",
//       "maxLength": 100
//     },
//     "summary": {
//       "type": "string",
//       "description": "Write a concise 2-3 sentence summary of the main content and key takeaways",
//       "maxLength": 300
//     },
//     "key_points": {
//       "type": "array",
//       "description": "Extract 3-7 most important points as bullet points. Each should be actionable or memorable.",
//       "items": {
//         "type": "string",
//         "maxLength": 150
//       },
//       "minItems": 3,
//     },
//     "sections": {
//       "type": "array",
//       "description": "Organize content into 2-5 logical sections with clear headings and detailed content",
//       "items": {
//         "type": "object",
//         "properties": {
//           "heading": {
//             "type": "string",
//             "description": "Clear section heading (2-5 words)",
//             "maxLength": 50
//           },
//           "content": {
//             "type": "string",
//             "description": "Detailed section content with explanations, examples, or elaboration",
//             "maxLength": 500
//           }
//         },
//         "required": ["heading", "content"],
//         "additionalProperties": false
//       },
//       "minItems": 2,
//       "maxItems": 5
//     },
//     "language": {
//       "type": "string",
//       "description": "language of note"
//     }
//   },
//   "required": ["title", "summary", "key_points", "sections",'language'],
//   "additionalProperties": false
// }

// const structureOutputJSONSchema = {
//   youtube: youtube,
//   pdf: pdf,
//   audio: audio,
//   web: '',
//   video: video
// };

// export default structureOutputJSONSchema;

export const responseFormat = {
  "type": "object",
  "required": ["title", "summary", "key_points", "sections", 'language', "suggestionQuery"],
  // "if": {
  //   "properties": {
  //     "source_type": {
  //       "enum": ["audio", "video", "youtube"]
  //     }
  //   }
  // },
  // "then": {
  //   "properties": {
  //     "transcript": {
  //       "type": "array",
  //       "description": "Structured transcript with speaker information, timestamps, and actual spoken text",
  //       "items": {
  //         "type": "object",
  //         "properties": {
  //           "speaker": {
  //             "type": "string",
  //             "description": "Name or identifier of the speaker (e.g., 'Host', 'Guest', 'Instructor', 'John Doe', 'Unknown Speaker')",
  //             "maxLength": 100,
  //             "examples": ["Host", "Guest", "Instructor", "John Smith", "Interviewer", "Speaker"]
  //           },
  //           "duration": {
  //             "type": "string",
  //             "description": "Timestamp when this speaker segment occurs in MM:SS or H:MM:SS format",
  //             "pattern": "^([0-9]+:)?[0-5]?[0-9]:[0-5][0-9]$",
  //             "examples": ["00:04", "1:02", "15:30", "1:01:23", "2:45:12"]
  //           },
  //           "transcript": {
  //             "type": "string",
  //             "description": "The actual spoken text by this speaker during this time period, cleaned of filler words and formatted properly",
  //             "minLength": 10,
  //             "maxLength": 200
  //           }
  //         },
  //         "required": ["speaker", "duration", "transcript"],
  //         "additionalProperties": false
  //       },
  //       "minItems": 1
  //     }
  //   },
  //   "required": ["transcript"]
  // },
  "properties": {
    "source_type": {
      "type": "string",
      "enum": ["youtube", "web", "pdf", "audio", "video"],
      "description": "The type of source this note is generated from"
    },
    "title": {
      "type": "string",
      "description": "Generate a clear, descriptive title (3-8 words) that captures the main topic",
      "maxLength": 100
    },
    "summary": {
      "type": "string",
      "description": "Write a concise 2-3 sentence summary of the main content and key takeaways",
      "maxLength": 300
    },
    "key_points": {
      "type": "array",
      "description": "Extract 3-7 most important points as bullet points. Each should be actionable or memorable.",
      "items": {
        "type": "string",
        "maxLength": 150
      },
      "minItems": 3,
    },
    "sections": {
      "type": "array",
      "description": "Organize content into logical sections with clear headings and detailed content",
      "items": {
        "type": "object",
        "properties": {
          "heading": {
            "type": "string",
            "description": "Clear section heading (2-5 words)",
            "maxLength": 50
          },
          "content": {
            "type": "string",
            "description": "Detailed section content with explanations, examples, or elaboration",
            "maxLength": 1000
          }
        },
        "required": ["heading", "content"],
        "additionalProperties": false
      },
      "minItems": 2,
    },
    // "transcript": {
    //   "type": "array",
    //   "description": "Structured transcript with speaker information, timestamps, and actual spoken text",
    //   "items": {
    //     "type": "object",
    //     "properties": {
    //       "speaker": {
    //         "type": "string",
    //         "description": "Name or identifier of the speaker (e.g., 'Host', 'Guest', 'Instructor', 'John Doe', 'Unknown Speaker')",
    //         "maxLength": 100,
    //         "examples": ["Host", "Guest", "Instructor", "John Smith", "Interviewer", "Speaker"]
    //       },
    //       "duration": {
    //         "type": "string",
    //         "description": "Timestamp when this speaker segment occurs in MM:SS or H:MM:SS format",
    //         "pattern": "^([0-9]+:)?[0-5]?[0-9]:[0-5][0-9]$",
    //         "examples": ["00:04", "1:02", "15:30", "1:01:23", "2:45:12"]
    //       },
    //       "transcript": {
    //         "type": "string",
    //         "description": "The actual spoken text by this speaker during this time period, cleaned of filler words and formatted properly",
    //         "minLength": 10,
    //         "maxLength": 200
    //       }
    //     },
    //     "required": ["speaker", "duration", "transcript"],
    //     "additionalProperties": false
    //   },
    //   "minItems": 1
    // },
    "language": {
      "type": "string",
      "description": "ISO 639-1 language code of note content generated",
      "examples": ["en", "es", "fr", "de", "hi", "ja", "ko", "zh", "ar", "pt", "ru", "it"]
    },
    "suggestionQuery": {
      "type": "array",
      "description": "Generate 3-5 contextual question suggestions query based on the note content that users can ask the AI assistant. Each suggestion should be relevant, specific, and encourage deeper engagement with the material.",
      "items": {
        "type": "string",
        "description": "A suggested question or prompt related to the note content",
        "minLength": 10,
        "maxLength": 100
      },
      "minItems": 3,
      "maxItems": 5,
    }
  },
  "additionalProperties": false,
}
export const mindMap = {
  "type": "object",
  "required": ["title", "nodes"],
  "properties": {
    "title": {
      "type": "string",
      "description": "Title of the mindmap",
      "maxLength": 100
    },
    "nodes": {
      "$ref": "#/$defs/Node"
    }
  },
  "additionalProperties": false,
  "$defs": {
    "Node": {
      "type": "object",
      "required": ["name"],
      "properties": {
        "name": {
          "type": "string",
          "description": "Node label/title",
          "maxLength": 100
        },
        "children": {
          "type": "array",
          "description": "Child nodes",
          "items": {
            "$ref": "#/$defs/Node"
          }
        }
      },
      "additionalProperties": false
    }
  }
};

export const flashCard = {
  "type": "object",
  "required": ["title", "cards"],
  "properties": {
    "title": {
      "type": "string",
      "description": "Title of the flashcard set",
      "maxLength": 100
    },
    "cards": {
      "type": "array",
      "description": "Array of flashcards",
      "items": {
        "type": "object",
        "required": ["question", "answer"],
        "properties": {
          "question": {
            "type": "string",
            "description": "The question on the flashcard",
            "minLength": 5,
            "maxLength": 300
          },
          "answer": {
            "type": "string",
            "description": "The answer to the question",
            "minLength": 5,
            "maxLength": 500
          },
          "explanationOfAnswer": {
            "type": "string",
            "description": "Optional explanation of the answer",
            "maxLength": 500
          }
        },
        "additionalProperties": false
      },
      "minItems": 5
    }
  },
  "additionalProperties": false
};
export const quiz = {
  "type": "object",
  "required": ["title", "quiz"],
  "properties": {
    "title": {
      "type": "string",
      "description": "Title of the quiz",
      "maxLength": 100
    },
    "quiz": {
      "type": "array",
      "description": "Array of quiz questions",
      "items": {
        "type": "object",
        "required": ["question", "options", "answer", "explanationOfAnswer"],
        "properties": {
          "question": {
            "type": "string",
            "description": "The quiz question",
            "minLength": 10,
            "maxLength": 300
          },
          "options": {
            "type": "array",
            "description": "Array of answer options",
            "items": {
              "type": "object",
              "required": ["serial", "label"],
              "properties": {
                "serial": {
                  "type": "string",
                  "description": "Option serial (A, B, C, D, etc.)",
                  "pattern": "^[A-Z]$"
                },
                "label": {
                  "type": "string",
                  "description": "Option text/label",
                  "minLength": 1,
                  "maxLength": 200
                }
              },
              "additionalProperties": false
            },
            "minItems": 2,
            "maxItems": 5
          },
          "answer": {
            "type": "string",
            "description": "Serial letter of the correct answer (A, B, C, D, etc.)",
            "pattern": "^[A-Z]$"
          },
          "explanationOfAnswer": {
            "type": "string",
            "description": "Explanation of why this answer is correct",
            "minLength": 10,
            "maxLength": 500
          }
        },
        "additionalProperties": false
      },
      "minItems": 10
    }
  },
  "additionalProperties": false
};

export const responseFormatV2 = {
  "type": "object",
  "required": ["title", "summary", "language", "suggestionQuery"],
  "properties": {
    "source_type": {
      "type": "string",
      "enum": ["youtube", "web", "pdf", "audio", "video"],
      "description": "The type of source this note is generated from"
    },
    "title": {
      "type": "string",
      "description": "Generate a clear, descriptive title (3-8 words) that captures the main topic",
      "maxLength": 100
    },
    "summary": {
      "type": "string",
      "description": "Complete content in Markdown format including title, summary, key points, sections, and all other information. Use proper Markdown syntax with headers (##, ###), lists (-, *), bold (**), italic (*), code blocks (```), etc.",
      "minLength": 100
    },
    "language": {
      "type": "string",
      "description": "ISO 639-1 language code of note content generated",
      "examples": ["en", "es", "fr", "de", "hi", "ja", "ko", "zh", "ar", "pt", "ru", "it"]
    },
    "suggestionQuery": {
      "type": "array",
      "description": "Generate 3-5 contextual question suggestions based on the note content that users can ask the AI assistant",
      "items": {
        "type": "string",
        "description": "A suggested question or prompt related to the note content",
        "minLength": 10,
        "maxLength": 100
      },
      "minItems": 3,
      "maxItems": 5
    },
    // quiz: quizSchema,
    // flashCards: flashCardSchema,
    // mindMap: mindMapSchema
  },
  "additionalProperties": false
};

export const translate = {
  "type": "object",
  "description": "translation schema for converting notes content to target language",
  "properties": {
    "title": {
      "type": "string",
      "description": "Translate the original title into target language while maintaining its descriptive nature and clarity"
    },
    "summary": {
      "type": "string",
      "description": "Translate the original summary into target language while preserving meaning and context."
    },
    "key_points": {
      "type": "array",
      "description": "Translate all key points into target language while maintaining their actionable and memorable nature. Preserve technical terms and concepts appropriately.",
      "items": {
        "type": "string"
      },
      "minItems": 3
    },
    "sections": {
      "type": "array",
      "description": "Translate all section content into target language while preserving original structure and organization. Maintain technical accuracy and natural flow.",
      "items": {
        "type": "object",
        "properties": {
          "heading": {
            "type": "string",
            "description": "Translate section heading into target language, keeping it clear and concise (2-5 words equivalent)"
          },
          "content": {
            "type": "string",
            "description": "Translate detailed section content into target language while preserving explanations, examples, and technical accuracy. Ensure natural flow in target language."
          }
        },
        "required": ["heading", "content"],
        "additionalProperties": false
      },
      "minItems": 2
    },
    "source_language": {
      "type": "string",
      "description": "ISO 639-1 language code of the original content",
      "examples": ["en", "es", "fr", "de", "hi", "ja", "ko", "zh", "ar", "pt", "ru", "it"]
    },
    "target_language": {
      "type": "string",
      "description": "ISO 639-1 language code of the translated content",
      "examples": ["en", "es", "fr", "de", "hi", "ja", "ko", "zh", "ar", "pt", "ru", "it"]
    }
  },
  "required": ["title", "summary", "key_points", "sections", "source_language", "target_language"],
  "additionalProperties": false
}
export default { translate,responseFormatV2,quiz,mindMap,flashCard }