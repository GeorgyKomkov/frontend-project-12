import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const modals = {
  addChannel: Add,
  removeChannel: Remove,
  renameChannel: Rename,
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
