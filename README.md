# Contentful Simple Reference Field

Contentful provides a powerful mechanism to link to other entries, accessible on the UI trough the Reference field widget.
Such field works perfectly for most of the cases, however, there are a few situations we may prefer a more minimalist widget, like when referencing to a less dynamic and populated content model. Let's imagine that we have a content model `Category` and `Sub Category` that is used to categorized articles.
So, instead of using the `Reference` field and having to click and select from the modal the desired channel we can have instead a simple dropdown (select) or radio buttons, but maintaining the same `reference` data.

## Overview

The extension has the following features:

- Change the display widget of a "Single Reference" field to use a Dropdown or Radio options
- Change the display widget of "Many references" to use Checkboxes options
- Support for pre-filtering of referenced entries using Contentful query filter format
- Supports localization

## Requirements

- Contentful CMS account with permissions to manage extensions

## Usage

1. Add a new `Reference` (One Reference or Many Reference) field to your content model, it can be localized.
2. On validations ensure that `Accept only specified entry type` is selected and only one content type is selected.
3. On the Appearance tab ensure that `Simple Reference` is selected, and on display option, we define the field we want to show in the dropdown/radios.

The field saved data is the same as the default `Reference` widget, e.g.:

```json
{
  "fields": {
    "title": {
      "en-US": "Test Page"
    },
    "slug": {
      "en-US": "test-page"
    },
    "channel": {
      "en-US": {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "fs0arvLf9GqSIOJklSwnF"
        }
      }
    }
  }
}
```

When using "Many references" it will automatically use checkboxes:

## Optional Usage for Development

After cloning, install the dependencies

```bash
yarn install
```

To bundle the extension

```bash
yarn build
```

To host the extension for development on `http://localhost:1234`

```bash
yarn start
```

To install the extension:

```bash
contentful extension update --force
```

## Limitations

Number of displayed entries. However that's not completely a limitation, as the purpose is to use the widget when referencing a content model that has only a few entries.

## Copyright and license

Copyright 2020 pauloamgomes under the MIT license.
