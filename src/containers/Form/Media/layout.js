import React from 'react';
import PropTypes from 'prop-types';
import {
  DetailHeader,
  DetailsPanelMessage,
  InputField,
  SelectField,
  PageHeader,
  CloseIconSVG,
  FileUploadField,
} from 'cx-ui-components';
import styled from 'styled-components';
import { Field } from 'redux-form/immutable';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { generateUUID } from 'serenova-js-utils/uuid';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MediaDetailHeader = styled(DetailHeader)`
  padding-left: 10px;
`;
const MediaList = styled.div`
  .mediaListItem {
    display: grid;
    grid-template-columns: 25px 1fr 1fr 25px;
    gap: 20px;
    margin: 10px 0px;
    font-size: 14px;
    align-items: center;
  }
`;
const MediaTable = styled.div`
  display: grid;
  grid-template-columns: 25px 1fr 1fr 25px;
  gap: 20px;
  margin: 20px 0px;
  font-size: 14px;
`;
const MediaTableHeader = styled.span`
  font-weight: bold;
`;
const MediaCloseIcon = styled(CloseIconSVG)`
  margin-left: 10px;
  position: relative;
  bottom: --5px;
`;
const StyledSelect = styled.select`
  border-radius: 5px;
  padding: 5px 5px;
  border-color: #808080a8;
  width: 100%;
`;
const OR = styled.span`
  font-size: 14px;
  margin-left: 50%;
  display: inline-flex;
  padding-bottom: 10px;
`;
const mediaTypesLabels = {
  audio: 'Audio',
  tts: 'Text-to-Speech',
  list: 'Media List',
};

const acceptedFileTypeAllowed = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/wave'];

const MediaListField = ({ input: { value, onChange }, userHasUpdatePermission, medias }) => {
  const displayValues = value.map((value) => ({ mediaId: value, fakeId: generateUUID() }));

  // When creating a new list start with at least one item
  if (value && value.size === 0) {
    if (medias.size < 0) {
      onChange(value.push(medias.first().value));
    }
  }

  const onDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const orderSwapped = value.delete(source.index).insert(destination.index, value.get(source.index));

    onChange(orderSwapped);
  };

  const mediaSelectionChanged = (newMediaId, index) => {
    const selectionChanged = value.delete(index).insert(index, newMediaId);
    onChange(selectionChanged);
  };

  const removeListItem = (index) => {
    const selectionChanged = value.delete(index);

    onChange(selectionChanged);
  };

  const findMedia = (medias, mediaId) =>
    medias.find(({ value }) => value === mediaId) || { value: '', label: 'Select an Option' };

  if (medias && medias.size) {
    return (
      <>
        <MediaDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text="List Item(s)"
          onActionButtonClick={() => onChange(value.push(medias.first().value))}
          open
        />
        <MediaList>
          <MediaTable>
            <span />
            <MediaTableHeader>Name</MediaTableHeader>
            <MediaTableHeader>Type</MediaTableHeader>
            <span />
          </MediaTable>
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <Droppable droppableId="medias">
              {({ droppableProps, innerRef, placeholder }) => (
                <div {...droppableProps} ref={innerRef}>
                  {displayValues.map(({ mediaId, fakeId }, index) => {
                    const selectedMedia = findMedia(medias, mediaId);
                    const selectedMediaType = selectedMedia ? mediaTypesLabels[selectedMedia.type] : '';

                    return (
                      <Draggable key={fakeId} draggableId={fakeId} index={index}>
                        {({ draggableProps, dragHandleProps, innerRef }) => (
                          <span className="mediaListItem" {...draggableProps} {...dragHandleProps} ref={innerRef}>
                            <DragIndicatorIcon />

                            <StyledSelect
                              id={`MediaSelect-${mediaId}-${index}`}
                              value={selectedMedia.value}
                              onChange={({ target: { value: newMediaId } }) =>
                                mediaSelectionChanged(newMediaId, index)
                              }>
                              {medias.map((media, index) => (
                                <option key={media.value + index} value={media.value}>
                                  {media.label}
                                </option>
                              ))}
                            </StyledSelect>

                            <span>{selectedMediaType}</span>

                            <MediaCloseIcon onClick={() => removeListItem(index)} size={10} />
                          </span>
                        )}
                      </Draggable>
                    );
                  })}
                  {placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </MediaList>
      </>
    );
  } else {
    return (
      <DetailsPanelMessage
        text="No media exists to add in list. Please add media separately in create forms before adding to list."
        type="warning"
      />
    );
  }
};

export default function MediaForm(props) {
  const { mediaType } = props;
  const isDisabled = props.isSaving || props.inherited || !props.userHasUpdatePermission;
  return (
    <form onSubmit={props.handleSubmit} key={props.key}>
      <DetailHeader text="Details" />
      <InputField
        name="name"
        label="Name *"
        componentType="input"
        inputType="text"
        data-automation="MediaFormFieldName"
        disabled={isDisabled}
      />
      <SelectField
        name="type"
        label="Type *"
        disabled={isDisabled}
        options={[
          { label: 'Select type...', value: '' },
          { label: 'Audio', value: 'audio' },
          { label: 'Text-to-Speech', value: 'tts' },
          { label: 'Media List', value: 'list' },
        ]}
        data-automation="MediaFormFieldType"
        required
      />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        data-automation="MediaFormFieldDescription"
        disabled={isDisabled}
      />
      {(mediaType === 'audio' || mediaType === 'tts') && <DetailHeader text="Source" />}
      {mediaType === 'tts' && (
        <>
          <InputField
            name="source"
            label="Text *"
            componentType="textarea"
            inputType="text"
            data-automation="MediaFormFieldSource"
            disabled={isDisabled}
            required
          />
          <SelectField
            name="properties.language"
            label="Language *"
            options={[
              { value: '', label: 'Select Language...' },
              { value: 'da-DK', label: 'Danish, Denmark' },
              { value: 'de-DE', label: 'German, Germany' },
              { value: 'en-AU', label: 'English, Australia' },
              { value: 'en-CA', label: 'English, Canada' },
              { value: 'en-GB', label: 'English, UK' },
              { value: 'en-IN', label: 'English, India (Twilio only)' },
              { value: 'en-US', label: 'English, United States' },
              { value: 'ca-ES', label: 'Catalan, Spain' },
              { value: 'es-ES', label: 'Spanish, Spain' },
              { value: 'es-MX', label: 'Spanish, Mexico' },
              { value: 'fi-FI', label: 'Finnish, Finland' },
              { value: 'fr-CA', label: 'French, Canada' },
              { value: 'fr-FR', label: 'French, France' },
              { value: 'it-IT', label: 'Italian, Italy' },
              { value: 'ja-JP', label: 'Japanese, Japan' },
              { value: 'ko-KR', label: 'Korean, Korea' },
              { value: 'nb-NO', label: 'Norwegian, Norway' },
              { value: 'nl-NL', label: 'Dutch, Netherlands' },
              { value: 'pl-PL', label: 'Polish-Poland' },
              { value: 'pt-BR', label: 'Portuguese, Brazil' },
              { value: 'pt-PT', label: 'Portuguese, Portugal' },
              { value: 'ru-RU', label: 'Russian, Russia' },
              { value: 'sv-SE', label: 'Swedish, Sweden' },
              { value: 'zh-CN', label: 'Chinese (Mandarin)' },
              { value: 'zh-HK', label: 'Chinese (Cantonese)' },
              { value: 'zh-TW', label: 'Chinese (Taiwanese Mandarin)' },
            ]}
            data-automation="MediaFormFieldLanguage"
            disabled={isDisabled}
          />
          <Wrapper>
            <SelectField
              name="properties.voice"
              label="Voice *"
              options={[
                { value: '', label: 'Select Voice...' },
                { value: 'man', label: 'Man' },
                { value: 'woman', label: 'Woman' },
                { value: 'alice', label: 'Alice' },
              ]}
              data-automation="MediaFormFieldVoice"
              disabled={isDisabled}
            />
            <PageHeader
              text="Supported Languages"
              helpLink="https://docs.cxengage.net/Help/Content/Resources/Supported_Languages.htm"
            />
          </Wrapper>
        </>
      )}
      {mediaType === 'audio' && (
        <>
          <FileUploadField
            uploadFile={() => ''}
            acceptedFileType={acceptedFileTypeAllowed.toString()}
            label="Upload Audio File *"
            disabled={isDisabled}
            name="sourceFile"
            maxFileSize={1010241024}
            toastError={`File must be audio and under 10MB`}
            required
          />
          <OR>-OR-</OR>
          <InputField name="source" label="Audio File URL *" componentType="input" inputType="text" />
        </>
      )}
      {mediaType === 'list' && (
        <Field
          name="source"
          rerenderOnEveryChange
          component={MediaListField}
          props={{
            disabled: props.isSaving,
            userHasUpdatePermission: props.userHasUpdatePermission,
            medias: props.medias,
          }}
        />
      )}
    </form>
  );
}

MediaListField.propTypes = {
  disabled: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  fields: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  medias: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

MediaForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  initialValues: PropTypes.object.isRequired,
  mediaType: PropTypes.string,
  medias: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const DragIndicatorIcon = ({ width = 24, fill = '#808080a8' }) => (
  <svg viewBox="0 0 24 24" width={width}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path
      fill={fill}
      d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
    />
  </svg>
);
