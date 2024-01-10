/* eslint-disable no-unused-vars */
import { Menu } from '@headlessui/react';
import { Fragment } from 'react';
import type { InputType } from '../useForms';

export default function DropdownQuestion({
  changeQuestionType,
  changeDescriptionStatus,
}: {
  changeQuestionType: (inputType: InputType) => void;
  changeDescriptionStatus: (status: boolean) => void;
}) {
  const menu = [
    {
      src: '/assets/icons/menuAlt.svg',
      text: 'Short Answer',
      onClick: () => changeQuestionType('text'),
    },
    {
      src: '/assets/icons/menu.svg',
      text: 'Paragraph',
      onClick: () => changeQuestionType('textarea'),
    },
    {
      src: '/assets/icons/grid.svg',
      text: 'Radio',
      onClick: () => changeQuestionType('radio'),
    },
    {
      src: '/assets/icons/check.svg',
      text: 'Checkbox',
      onClick: () => changeQuestionType('checkbox'),
    },
    {
      src: '/assets/icons/documentAdd.svg',
      text: 'Add description',
      onClick: () => changeDescriptionStatus(true),
    },
    {
      src: '/assets/icons/documentRemove.svg',
      text: 'Delete desciption',
      onClick: () => changeDescriptionStatus(false),
    },
  ];
  return (
    <Menu as={Fragment}>
      {({ open }) => (
        <>
          <Menu.Button
            className={`${
              open ? 'z-10 bg-gray-300' : 'hover:bg-gray-100'
            } absolute right-2 top-2 cursor-pointer rounded-full p-2 duration-200 `}
          >
            <img alt="dots" className="h-6 w-6" src="/assets/icons/verticalDots.svg" />
          </Menu.Button>

          <Menu.Items className="absolute right-0 top-12 z-10 w-60 rounded bg-white shadow">
            <ul className="py-1 text-gray-500">
              {menu.map((el, index) => (
                <Menu.Item key={index} as="li">
                  <button
                    className="flex w-full items-center space-x-3 py-2 px-5 text-left hover:bg-gray-100"
                    onClick={el.onClick}
                    type="button"
                  >
                    <img alt={el.src} className="h-5 w-5" src={el.src} />
                    <p>{el.text}</p>
                  </button>
                </Menu.Item>
              ))}
            </ul>
          </Menu.Items>
        </>
      )}
    </Menu>
  );
}
