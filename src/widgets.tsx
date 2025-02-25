import React from 'react';
import { Link } from 'contentful-ui-extensions-sdk';
import {
  Select,
  Option,
  FieldGroup,
  RadioButtonField,
  CheckboxField,
  Tag,
  ValidationMessage
} from '@contentful/forma-36-react-components';


type EntryType = {
  display: string;
  status: string;
};

type SingeLinkProps = {
  values: Record<string, EntryType>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selected: Link | null;
  defaultValue: string | null;
};

type ManyLinksProps = {
  values: Record<string, EntryType>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selected: Link[] | null;
  defaultValue: string[] | null;
};

export const Dropdown = ({ values, onChange, selected, defaultValue }: SingeLinkProps) => {
  const active = (selected && selected.sys && selected.sys.id) || defaultValue || '';

  return (
    <>
      <Select
        id="simple-reference"
        name="simpleReference"
        onChange={onChange}
        value={active}
        width="large">
        <Option value="">Choose a Sub Category</Option>
        {Object.keys(values)
          .filter((key: string) => {
            if (values[key].status === 'Archived' && key !== active) {
              return false;
            }
            return true;
          })
          .map((key: string) => (
            <Option key={`entry-${key}`} value={key}>
              {values[key].display}
            </Option>
          ))}
      </Select>
      {active && values[active] && values[active].status && (
        <Tag
          className="entry-tag"
          entityStatusType={
            values[active].status.toLowerCase() as 'published' | 'draft' | 'archived' | 'changed'
          }>
          {values[active].status}
        </Tag>
      )}
      {active && !values[active] && (
        <div>
          <ValidationMessage>No Category Selected or Category has no Sub Categories</ValidationMessage>
        </div>
      )}
    </>
  );
};

export const Radios = ({ values, selected, onChange, defaultValue }: SingeLinkProps) => {
  const active = (selected && selected.sys && selected.sys.id) || defaultValue || '';

  return (
    <>
      <FieldGroup>
        {Object.keys(values)
          .filter((key: string) => {
            if (values[key].status === 'Archived' && key !== active) {
              return false;
            }
            return true;
          })
          .map((key: string) => (
            <RadioButtonField
              id={key}
              name={key}
              key={`entry-${key}`}
              value={key}
              labelText={values[key].display}
              checked={active.includes(key)}
              onChange={onChange}
              labelIsLight
              helpText={values[key].status}
              helpTextProps={{ className: `entry-status ${values[key].status.toLowerCase()}` }}
            />
          ))}
      </FieldGroup>
      {active && !values[active] && (
        <div>
          <ValidationMessage>No Category Selected or Category has no Sub Categories</ValidationMessage>
        </div>
      )}
    </>
  );
};

export const Checkboxes = ({ values, selected, onChange, defaultValue }: ManyLinksProps) => {
  const active = (selected && selected.map((ref: Link) => ref.sys.id)) || defaultValue || [];
  const allIds = (values && Object.keys(values)) || [];

  return (
    <>
      <FieldGroup>
        {Object.keys(values)
          .filter((key: string) => {
            if (values[key].status === 'Archived' && !active.includes(key)) {
              return false;
            }
            return true;
          })
          .map((key: string) => (
            <CheckboxField
              id={key}
              name={key}
              key={`entry-${key}`}
              value={key}
              labelText={values[key].display}
              checked={active.includes(key)}
              onChange={onChange}
              labelIsLight
              helpText={values[key].status}
              helpTextProps={{ className: `entry-status ${values[key].status.toLowerCase()}` }}
            />
          ))}
      </FieldGroup>
      {active && !active.every((item: string) => allIds.includes(item)) && (
        <div>
          <ValidationMessage>No Category Selected or Category has no Sub Categories</ValidationMessage>
        </div>
      )}
    </>
  );
};
