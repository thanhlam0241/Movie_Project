FROM nginx:1.25.5

# Change Nginx config here...
# COPY /app/client_ui /usr/share/nginx/client_ui

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]