import { motion } from 'framer-motion';
import { memo } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import { Button } from 'react-bootstrap';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnimationModal = ({ isOpen, onClose }: ModalProps) => {
  const animation = {
    hidden: { scale: 0.1, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };

  const handleClose = () => {
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <motion.div
      className={styles.modal_container}
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      variants={animation}
      onClick={handleClose}
    >
      <div className={styles.modal_content}>
        <Image src="/banner/skull.png" alt="skull" width={540} height={500} />
        <h2 style={{"textAlign":"center"}}>Coughing, choking and various damages to the environment! Think Again!</h2>
        <Button variant="light" onClick={handleClose}>
          Select Again!
        </Button>
      </div>
    </motion.div>
  );
};

export default memo(AnimationModal);
