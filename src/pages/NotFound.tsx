import { Compass } from 'lucide-react';
import { Button, EmptyState } from '../components/ui';

export function NotFound() {
  return <EmptyState icon={<Compass size={22} />} title="העמוד לא נמצא" description="הקישור שהגעת ממנו כבר לא קיים." action={<Button to="/" variant="primary">חזרה לראשי</Button>} />;
}
