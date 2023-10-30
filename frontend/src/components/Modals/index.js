import Add from './Add';

const modals = {
  addChannel: Add,
};
// по типу окна вызываем необходимое модальное окно
const getModal = (type) => modals[type];

const getModalComponent = (type) => {
  if (type === null) return null;
  // if (!type) return null;

  const ModalComponent = getModal(type);

  return <ModalComponent />;
};

export default getModalComponent;
