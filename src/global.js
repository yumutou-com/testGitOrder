import { message } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

// if pwa is true
if (process.env.NODE_ENV === 'production') {
  // Notify user if offline now
  window.addEventListener('sw.offline', () => {
    message.warning(formatMessage({ id: 'app.pwa.offline' }));
  });
}
