import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const parseInlineMarkdown = (text: string): (string | JSX.Element)[] => {
  const elements: (string | JSX.Element)[] = [];
  let lastIndex = 0;

  // Regex to find **bold** or *italic* or __bold__ or _italic_
  const regex = /(\*\*(.*?)\*\*|__(.*?)__|\*(.*?)\*|_(.*?)_)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }

    // Add the bold/italic element
    if (match[2] !== undefined || match[3] !== undefined) { // Bold
      elements.push(<strong key={`${lastIndex}-bold`}>{match[2] || match[3]}</strong>);
    } else if (match[4] !== undefined || match[5] !== undefined) { // Italic
      elements.push(<em key={`${lastIndex}-italic`}>{match[4] || match[5]}</em>);
    }
    lastIndex = regex.lastIndex;
  }

  // Add any remaining text
  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }
  
  return elements.filter(el => (typeof el === 'string' && el.length > 0) || typeof el !== 'string');
};


export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderLines = (text: string): (JSX.Element | null)[] => {
    return text.split('\n').map((line, index) => {
      // Trim leading/trailing whitespace from line for accurate pattern matching
      const trimmedLine = line.trim();

      // Handle headings
      if (trimmedLine.startsWith('### ')) {
        return <h5 key={index} className="text-md font-semibold mt-2 mb-1">{parseInlineMarkdown(trimmedLine.substring(4))}</h5>;
      }
      if (trimmedLine.startsWith('## ')) {
        return <h4 key={index} className="text-lg font-semibold mt-3 mb-1">{parseInlineMarkdown(trimmedLine.substring(3))}</h4>;
      }
      if (trimmedLine.startsWith('# ')) {
        return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{parseInlineMarkdown(trimmedLine.substring(2))}</h3>;
      }

      // Handle bullet points: * item, - item, or + item
      const ulMatch = trimmedLine.match(/^(\s*[\*\-\+]\s)(.*)/);
      if (ulMatch) {
        return (
          <li key={index} className="ml-5 list-disc">
            {parseInlineMarkdown(ulMatch[2])}
          </li>
        );
      }

      // Handle numbered lists: 1. item
      const olMatch = trimmedLine.match(/^(\s*\d+\.\s)(.*)/);
      if (olMatch) {
        return (
          <li key={index} className="ml-5 list-decimal">
            {parseInlineMarkdown(olMatch[2])}
          </li>
        );
      }
      
      // Handle empty lines or lines with only whitespace
      if (trimmedLine === '') {
        return <br key={`br-${index}`} />; // Or null if you want to collapse multiple empty lines
      }

      // Default to paragraph for non-empty lines
      return <p key={index} className="mb-2 last:mb-0">{parseInlineMarkdown(line)}</p>;
    });
  };

  const groupListItems = (elements: (JSX.Element | null)[]) => {
    const groupedElements: JSX.Element[] = [];
    let currentListType: 'ul' | 'ol' | null = null;
    let listItems: JSX.Element[] = [];

    elements.forEach((el, index) => {
      if (!el) { // Handle potential nulls from renderLines (e.g., if we decide to return null for empty lines)
        // If there's an ongoing list, and we hit a separator (like <br/> or a non-list element), end the list.
        if (listItems.length > 0 && currentListType) {
            groupedElements.push(React.createElement(currentListType, { key: `list-${index-listItems.length}`, className: "space-y-1 my-2" }, listItems));
            listItems = [];
            currentListType = null;
        }
        if (el) groupedElements.push(el); // if it was <br/> for instance
        return;
      }
      
      const isUnorderedListItem = el.props.className?.includes('list-disc');
      const isOrderedListItem = el.props.className?.includes('list-decimal');

      if (isUnorderedListItem) {
        if (currentListType !== 'ul') {
          if (listItems.length > 0) {
            groupedElements.push(React.createElement(currentListType === 'ol' ? 'ol' : 'ul', { key: `list-${index-listItems.length}`, className: "space-y-1 my-2" }, listItems));
          }
          listItems = [];
          currentListType = 'ul';
        }
        listItems.push(el);
      } else if (isOrderedListItem) {
         if (currentListType !== 'ol') {
          if (listItems.length > 0) {
            groupedElements.push(React.createElement(currentListType === 'ul' ? 'ul' : 'ol', { key: `list-${index-listItems.length}`, className: "space-y-1 my-2" }, listItems));
          }
          listItems = [];
          currentListType = 'ol';
        }
        listItems.push(el);
      } else {
        if (listItems.length > 0 && currentListType) { // End current list
          groupedElements.push(React.createElement(currentListType, { key: `list-${index-listItems.length}`, className: "space-y-1 my-2" }, listItems));
          listItems = [];
          currentListType = null;
        }
        groupedElements.push(el);
      }
    });
    
    if (listItems.length > 0 && currentListType) {
      groupedElements.push(React.createElement(currentListType, { key: `list-final`, className: "space-y-1 my-2" }, listItems));
    }
    
    return groupedElements;
  };

  const renderedLines = renderLines(content);
  const groupedContent = groupListItems(renderedLines);

  return <div className="prose prose-sm max-w-none text-gray-700">{groupedContent}</div>;
};