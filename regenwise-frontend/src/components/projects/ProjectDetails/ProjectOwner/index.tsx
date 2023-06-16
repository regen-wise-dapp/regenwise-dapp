import styles from './index.module.scss';
import Avatar from '@src/components/shared/Avatar';
import Divider from '@src/components/shared/Divider';
import { Project } from '@src/models/project';
import { Table } from 'react-bootstrap';

interface Props {
  project: Project;
}

export default function ProjectAuthor({ project }: Props): JSX.Element {
  return (
    <div className={`${styles.main_container}`}>
      <h3 className="font-extrabold">Project Info</h3>
      <Table hover size="sm">
        <tbody>
          <tr>
            <td className="font-extrabold">Status:</td>
            <td>{project.approvalStatus}</td>
          </tr>
          <tr>
            <td className="font-extrabold">Project Type:</td>
            <td>{project.isInstutional ? `Institutional` : `Personal`}</td>
          </tr>
          <tr>
            <td className="font-extrabold">Country:</td>
            <td>{project.country}</td>
          </tr>
          <tr>
            <td className="font-extrabold">City:</td>
            <td>{project.city}</td>
          </tr>
          <tr>
            <td className="font-extrabold">Adress:</td>
            <td>{project.address}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

