import { useSelector } from "react-redux";
import { onToggleModal } from "../store/actions/app.actions.js";

export function DynamicModal() {
  const modalData = useSelector((storeState) => storeState.appModule.modalData);

  function onCloseModal() {
    onToggleModal(null);
  }

  if (!modalData) return <></>;

  const Cmp = modalData?.cmp || (() => "");
  const props = modalData?.props || {};
  const style = modalData?.style || {};

  console.log(style);
  return (
    <>
      <section onClick={onCloseModal} className="modal-backdrop"></section>
      <section style={style} className="modal-content">
        <Cmp {...props} />
        <button className="btn close-btn" onClick={onCloseModal}>
          X
        </button>
      </section>
    </>
  );
}
