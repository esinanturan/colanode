import { type NodeViewProps } from '@tiptap/core';
import { NodeViewWrapper } from '@tiptap/react';

import { LocalPageNode } from '@colanode/client/types';
import { Avatar } from '@colanode/ui/components/avatars/avatar';
import { useLayout } from '@colanode/ui/contexts/layout';
import { useWorkspace } from '@colanode/ui/contexts/workspace';
import { useLiveQuery } from '@colanode/ui/hooks/use-live-query';

export const PageNodeView = ({ node }: NodeViewProps) => {
  const workspace = useWorkspace();
  const layout = useLayout();

  const id = node.attrs.id;
  const nodeGetQuery = useLiveQuery({
    type: 'node.get',
    nodeId: id,
    accountId: workspace.accountId,
    workspaceId: workspace.id,
  });

  if (!id) {
    return null;
  }

  if (nodeGetQuery.isPending) {
    return null;
  }

  const page = nodeGetQuery.data as LocalPageNode;
  if (!page) {
    return null;
  }

  const name = page.attributes.name ?? 'Unnamed';
  const avatar = page.attributes.avatar;

  return (
    <NodeViewWrapper
      data-id={node.attrs.id}
      className="my-0.5 flex h-12 w-full cursor-pointer flex-row items-center gap-1 rounded-md bg-gray-50 p-2 hover:bg-gray-100"
      onClick={() => {
        layout.previewLeft(id, true);
      }}
    >
      <Avatar size="small" id={id} name={name} avatar={avatar} />
      <div role="presentation" className="flex-grow">
        {name}
      </div>
    </NodeViewWrapper>
  );
};
