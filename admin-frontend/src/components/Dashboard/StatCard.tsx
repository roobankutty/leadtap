import Card from "react-bootstrap/Card";

interface Props {
  title: string;
  value: number;
  icon: string;
  bg: string;
}

export default function StatCard({
  title,
  value,
  icon,
  bg,
}: Props) {
  return (
    <Card className={`text-white ${bg} shadow border-0`}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6>{title}</h6>
            <h2>{value}</h2>
          </div>

          <i className={`${icon} fs-1 opacity-75`}></i>
        </div>
      </Card.Body>
    </Card>
  );
}