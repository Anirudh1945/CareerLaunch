export const templates = {
  professional: {
    name: "Professional",
    description: "Clean, traditional design for corporate roles",
  },
  modern: {
    name: "Modern",
    description: "Contemporary design with subtle colors",
  },
  creative: {
    name: "Creative",
    description: "Eye-catching design for creative industries",
  },
  minimalist: {
    name: "Minimalist",
    description: "Simple, elegant, ATS-optimized design",
  },
}

export function getTemplateStyles(templateName: string) {
  const baseStyles = {
    container: "p-8 bg-white text-black",
    header: "border-b-2 border-gray-300 pb-4 mb-4",
    heading: "text-3xl font-bold text-gray-900",
    subHeading: "text-xl font-semibold text-gray-700 mt-4 mb-2",
    text: "text-gray-700 leading-relaxed",
    list: "list-disc list-inside text-gray-700",
  }

  const templateStyles: { [key: string]: { [key: string]: string } } = {
    professional: baseStyles,
    modern: {
      ...baseStyles,
      header: "border-l-4 border-blue-500 pl-4 mb-4",
      heading: "text-3xl font-bold text-blue-600",
      subHeading: "text-lg font-semibold text-blue-500 mt-3 mb-2",
    },
    creative: {
      ...baseStyles,
      header: "border-b-4 border-purple-500 pb-4 mb-4",
      heading: "text-4xl font-bold text-purple-600",
      subHeading: "text-lg font-bold text-purple-500 mt-4 mb-2 uppercase tracking-wide",
    },
    minimalist: {
      ...baseStyles,
      header: "mb-6",
      heading: "text-2xl font-bold text-gray-900 uppercase tracking-widest",
      subHeading: "text-sm font-bold text-gray-600 mt-4 mb-2 uppercase tracking-wide",
    },
  }

  return templateStyles[templateName] || baseStyles
}
