import {RenderPosition} from "../consts";

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
    case RenderPosition.AFTEREND:
      container.after(component.getElement());
      break;
    case RenderPosition.BEFOREBEGAN:
      container.before(component.getElement());
      break;
    default:
      break;
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistsElement = !!(parentElement && newElement && oldElement);

  if (isExistsElement && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};
