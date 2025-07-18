import { BulletList } from '@tiptap/extension-bullet-list';

import { defaultClasses } from '@colanode/ui/editor/classes';

export const BulletListNode = BulletList.configure({
  HTMLAttributes: {
    class: defaultClasses.bulletList,
  },
});
