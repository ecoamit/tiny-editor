import { FieldAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { SetStateAction, useEffect, useState } from 'react';
import htmlToRichText from '../utils/htmlToRichText';
import richTextToHtml from '../utils/richTextToHtml';
import { Editor } from '@tinymce/tinymce-react';


const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [value, setValue] = useState('');

  useEffect(() => {
    const initialValue = sdk.field.getValue();
    const htmlValue = richTextToHtml(initialValue);
    console.log(htmlValue);
    setValue(htmlValue);

    const detachValueChangeHandler = sdk.field.onValueChanged(newValue => {
      const updatedHtmlValue = richTextToHtml(newValue);
      setValue(updatedHtmlValue);
    });

    sdk.window.startAutoResizer();

    return () => {
      detachValueChangeHandler();
    };
  }, [sdk]);

  const handleEditorChange = (content: any) => {
    setValue(content);
    const richTextValue = htmlToRichText(content);
    sdk.field.setValue(richTextValue);
  };

  return (
    <Editor
      apiKey="shnyf4d14xq4614v6a2d3qgb91nl39yfqqhvkqmsm7a3l9mf"
      value={value}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          "table",
    "code",
    "preview",
    "image",
    "media",
    "lists",
    "directionality",
    "link",
    "searchreplace",
    "anchor",
    "charmap"
        ],
        toolbar: "fullScreen code  charmap  preview formatselect undo redo blocks fontfamily fontsize  formatselect " +
  "anchor link unlink openlink bold italic  underline backcolor  alignleft aligncenter alignright alignjustify " +
  "searchreplace  bullist numlist ltr rtl outdent indent  " +
  "removeformat table tabledelete tableprops tablerowprops tablecellprops tablemergecells tableinsertrowbefore tableinsertrowafter tabledeleterow  tableinsertcolbefore tableinsertcolafter tabledeletecol tablerowheader tablecolheader image media superscript subscript",}}
      onEditorChange={handleEditorChange}
    />
  );
};
//   /*
//      To use the cma, inject it as follows.
//      If it is not needed, you can remove the next line.
//   */
//   // const cma = useCMA();
//   // If you only want to extend Contentful's default editing experience
//   // reuse Contentful's editor components
//   // -> https://www.contentful.com/developers/docs/extensibility/field-editors/
//   return <Paragraph>Hello Entry Field Component (AppId: {sdk.ids.app})</Paragraph>;
// };


export default Field;