import { createComponent } from './component'
import { createBEM, BEM } from './bem'

type CreateNamespaceReturn = [
  ReturnType<typeof createComponent>,
  BEM
]

export function createNamespace(name: string): CreateNamespaceReturn {
  name = 'ml-' + name;
  return [createComponent(name), createBEM(name)]
}
